import React from 'react';
import './App.css';
import JsSIP from 'jssip';
import { ReactComponent as ChevronDown } from './chevron-down.svg';
import { Button, Card } from 'react-bootstrap';

const defaultConfiguration = {
    sockets: [],
    uri: 'sip:webrtc_client@localhost',
    password: 'webrtc_client',
    wss: 'ws://localhost:8088/ws',
    hostname: 'localhost'
};

type MyState = {
    inCall: boolean,
    callStatus: string,
    phoneStatus: string,
    micPermitted: boolean,
    session: any,
    hidden: boolean,
    configuration: any,
};

export default class App extends React.Component<any, MyState> {
    audio: HTMLAudioElement;
    eventHandlers: {};
    mediaConstraints: { audio: any; video: boolean; };
    ua: any; // Do not assign JsSIP.UA because TS will complain about it

    constructor(props: any) {
        super(props);

        this.state = {
            inCall: false,
            callStatus: 'Just press the button!',
            phoneStatus: 'disconnected',
            micPermitted: false,
            session: null,
            hidden: true,
            configuration: defaultConfiguration,
        }

        this.audio = new window.Audio();
        this.eventHandlers = {};
        this.mediaConstraints = {
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
            },
            video: false,
        }
        this.ua = undefined;
    }

    async checkPermissions(): Promise<MediaStream | string> {
        return new Promise((resolve, reject) => {
            const permissions = navigator.mediaDevices.getUserMedia(this.mediaConstraints)
            permissions.then((stream) => {
                this.setState({ micPermitted: true });
                return resolve(stream)
            }).catch((err) => {
                this.setState({ micPermitted: false });
                return reject(`${err.name} : ${err.message}`)
            });
        });
    }

    register(configuration: any) {
        const socket = new JsSIP.WebSocketInterface(configuration.wss);
        const newCfg = {
            sockets: [socket],
            uri: configuration.uri,
            password: configuration.password,
        };
        this.ua = new JsSIP.UA(newCfg);
        this.ua.on('registered', (e: any) => {
            this.setState({ phoneStatus: 'registered' });
        });
        this.ua.on('unregistered', (e: any) => {
            this.setState({ phoneStatus: 'unregistered' });
        })
        this.ua.on('connecting', (e: any) => {
            this.setState({ phoneStatus: 'connecting' });
        });
        this.ua.on('connected', (e: any) => {
            this.setState({ phoneStatus: 'connected' });
        });
        this.ua.on('disconnected', (e: any) => {
            this.setState({ phoneStatus: 'disconnected' });
        });
        this.ua.on('registrationFailed', (e: any) => {
            this.setState({ phoneStatus: 'registration failed' });
        });
        this.ua.on('newRTCSession', (e: any) => {
            this.setState({ phoneStatus: 'new session' });
        });
        this.ua.on('newMessage', (e: any) => {
            this.setState({ phoneStatus: 'new message' });
        });
        this.ua.start();
    }

    eventHandler(status: string, event: any = null) {
        this.setState({ phoneStatus: status });
    }

    setCallbacks() {
        // Register callbacks to desired call events
        this.eventHandlers = {
            'progress': (e: any) => {
                this.eventHandler('call is in progress', e);
            },
            'failed': (e: any) => {
                this.eventHandler('call failed', e);
                this.setState({ inCall: false });
            },
            'ended': (e: any) => {
                this.eventHandler('call ended', e);
                this.setState({ inCall: false });
            },
            'confirmed': (e: any) => {
                this.eventHandler('call confirmed');
            },
        };

    }

    call() {
        const permit = this.checkPermissions();
        permit.then(() => {
            const options = {
                'eventHandlers': this.eventHandlers,
                'mediaConstraints': this.mediaConstraints,
            };
            const extension = 'sip:echo@' + this.state.configuration.hostname;
            const session = this.ua.call(extension, options);
            if (session.connection) {
                session.connection.addEventListener('track', (e: any) => {
                    this.audio.srcObject = e.streams[0];
                    this.audio.play()
                })
                this.setState({ inCall: true, session: session });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    hangup() {
        this.state.session.terminate();
        this.setState({ inCall: false });
    }

    componentDidMount() {
        this.setCallbacks();
        this.setState({ configuration: defaultConfiguration });
        this.register(defaultConfiguration);
    }

    callBtn() {
        console.log(this.state.phoneStatus)
        const userDescription = (status: string) => {
            return "Ready to call";
        }
        if (this.ua === undefined) {
            return (
                <Button size="lg" variant='warning'>
                    Widget is not initialized properly
                </Button>
            )
        }
        if (this.state.phoneStatus === 'unregistered'
        || this.state.phoneStatus === 'registration failed'
        || this.state.phoneStatus === 'disconnected'
        || this.state.phoneStatus === 'connecting') {
            return (
                <Button size="lg" variant='warning'>
                    Widget is not registered
                </Button>
            )
        }
        if (this.state.inCall) {
            return (
                <Button size="lg" onClick={() => this.hangup()}>Hangup</Button>
            );
        }
        return (
            <Button size="lg" onClick={() => this.call()}>{userDescription(this.state.phoneStatus)}</Button>
        );
    }


    render() {
        if (this.state.hidden) {
            return (
                <div className="App">
                    <Button variant="success" size='lg' className="right-down-corner" onClick={() => this.setState({ hidden: false })}>
                        <span className="call-us-text">Press the button to ☎️ us!</span>
                    </Button>
                </div>
            );
        }

        return (
            <div className="right-down-corner-opened">
                <Card bg="success" text="white" style={{ width: '18rem' }} className="text-center">
                <Card.Header>
                    <Card.Title>
                        webrtc_client
                        <ChevronDown className="hide-btn" onClick={() => this.setState({ hidden: true })} />
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    {this.callBtn()}
                </Card.Body>
                <Card.Footer>
                    <Card.Link href="mailto:oleksii.radetskyi@gmail.com?subject=help" style={{color: 'white'}}>
                        Need help?
                    </Card.Link>
                </Card.Footer>
            </Card>
            </div>
        );
    }
}


