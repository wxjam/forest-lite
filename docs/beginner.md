
Getting started
===============

The command line interface to FOREST-Lite needs a lot of
care and attention since the deployed version doesn't use it
directly. Future releases will focus on converting this machine-friendly
interface into a human-friendly command line utility.

AWS EC2 usage
-------------

A command similar to the following is run inside a Docker container
on EC2 behind an NGINX load balancer to deploy FOREST-Lite.

!!! note
    This is purely illustrative of how FOREST can be run in production.
    A command line interface should be simpler.

```dockerfile
# Dockerfile
ENV CONFIG_FILE=/path/to/config.yaml
ENV DB_FILE=/path/to/config-users.yaml
ENV BASE_URL=.
ENV SECRET_KEY=fake_key
CMD python /path/to/server/main.py --port=8080
```

A script could be written to wrap the complexity for new starters
and to inform the command line interface of reasonable defaults
and pain points.

User database
-------------

A user database can be prepared using a helper
command

```bash
forest_lite database $USER_NAME $PASSWORD $DB_FILE
```

This creates a small `yaml` file that can be used with the app
to allow custom user experiences. This feature should be off by default
in future releases.

Command line interface
----------------------

The command line interface needs to be
upgraded to perform the same tasks as the deployed AWS EC2
configuration. At present it calls the main program
with an overridden `get_settings` function, see `forest_lite/cli.py`
for further details.

```bash
SECRET_KEY=foo DB_FILE=users.yaml forest_lite view --driver $DRIVER $FILE_NAME
```

As the command line interface is brand new and
hasn't been tested with real data milage may vary.

Example bash script
-------------------

For convenience the above steps can be merged into a single script.

```bash
#!/bin/bash
DB_DIR=$1
USERNAME=$2
PASSWORD=$3
FILE_NAME=$4

# Update/create users DB
forest_lite database $USERNAME $PASSWORD $DB_DIR/users_db.yaml

# Start FOREST-Lite server
SECRET_KEY=foobar \
DB_FILE=$DB_DIR/users_db.yaml \
forest_lite view --driver xarray_h5netcdf $FILE_NAME
```


!!! note
    Future releases will focus on simplifying the above command
