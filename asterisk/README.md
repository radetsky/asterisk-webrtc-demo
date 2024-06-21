# PBX13 dev image 

## Build 
```
cd docker/asterisk
docker build -t pbx13 . 
```

...
or rebuild from scratch 
...

```
docker build --no-cache --progress plain -t pbx13 .
```


## Run 
```
docker run -p 5060:5060/udp --rm -it --name asterisk pbx13
```

### With volume astcfg: -> /etc/asterisk to save changed configuration 
```
docker run -p 5060:5060/udp --rm -it --name asterisk --mount source=astcfg,target=/etc/asterisk pbx13
```

