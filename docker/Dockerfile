FROM python:3.10

ARG DIGI_EDIT_USER="digi_edit"
ARG DIGI_EDIT_UID="10000"
ARG DIGI_EDIT_GID="10000"

# Create the user
RUN groupadd --gid $DIGI_EDIT_GID $DIGI_EDIT_USER && \
    useradd --gid $DIGI_EDIT_GID --no-log-init --shell /bin/bash --uid $DIGI_EDIT_UID $DIGI_EDIT_USER

# Install base dependencies
RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y tini git

# Copy the application and configuration file
COPY digi_edit-1.2.3-py3-none-any.whl /tmp/

# Install the application
RUN python -m pip install /tmp/digi_edit-1.2.3-py3-none-any.whl[postgresql]
COPY start_digi_edit.sh /usr/bin/
RUN chmod a+x /usr/bin/start_digi_edit.sh && \
    mkdir /var/lib/digi-edit && \
    mkdir /etc/digi-edit && \
    chmod 0755 /var/lib/digi-edit && \
    chown -R ${DIGI_EDIT_USER}:${DIGI_EDIT_USER} /etc/digi-edit && \
    chown -R ${DIGI_EDIT_USER}:${DIGI_EDIT_USER} /var/lib/digi-edit

# Setup the running environment
USER ${DIGI_EDIT_UID}:${DIGI_EDIT_GID}
VOLUME [ "/var/lib/digi-edit" ]
ENV LC_ALL=C
WORKDIR /var/lib/digi_edit
EXPOSE 8080
ENTRYPOINT [ "tini", "--" ]
CMD [ "/usr/bin/start_digi_edit.sh" ]
