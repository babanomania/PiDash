mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(dir $(mkfile_path))
port ?= 8080

all: install

install: remove

		@echo "Building Application"
		@npx next build

		@echo "Installing Service"
		@echo "[Unit]" > /tmp/PiDash.service
		@echo "Description=PiDash Service" >> /tmp/PiDash.service
		@echo "After=network.target" >> /tmp/PiDash.service
		@echo "" >> /tmp/PiDash.service
		@echo "[Service]" >> /tmp/PiDash.service
		@echo "WorkingDirectory=${current_dir}" >> /tmp/PiDash.service
		@echo "ExecStart=/usr/bin/npx next start -p ${port}" >> /tmp/PiDash.service
		@echo "Restart=on-failure" >> /tmp/PiDash.service
		@echo "User=pi" >> /tmp/PiDash.service
		@echo "" >> /tmp/PiDash.service
		@echo "[Install]" >> /tmp/PiDash.service
		@echo "WantedBy=multi-user.target" >> /tmp/PiDash.service
		@echo "" >> /tmp/PiDash.service

		@sudo cp /tmp/PiDash.service /etc/systemd/system/
		@sudo systemctl enable PiDash.service
		
		@echo "Starting Service"
		@sudo systemctl start PiDash.service

		@echo "Installation Done"

upgrade: 
		@echo "Disabling Service"
		@sudo systemctl stop PiDash.service

		@echo "Updating Code"
		@git pull origin

		@echo "Building Application"
		@npx next build

		@echo "Starting Service"
		@sudo systemctl start PiDash.service

		@echo "Upgrade Done"

remove:
		@echo "Removing Service"
		@-sudo systemctl stop PiDash.service
		@-sudo systemctl disable PiDash.service
		@-sudo rm -f /etc/systemd/system/PiDash.Service

		@echo "Service Removed"
