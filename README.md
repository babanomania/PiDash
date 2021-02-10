# Raspberry PI Monitoring Dashboard

A lightweight & minimalistic monitoring dashboard for Raspberry Pi

![screenshot](screenshot.png "screenshot")

## Installation on the Raspberry Pi

- Install nodejs on your pi using the below command

  ```bash
  curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
  sudo apt install -y nodejs
  sudo apt purge -y nodejs.*
  ```

- Install git on your pi using the below command

  ```bash
  sudo apt update
  sudo apt-get install git
  ```

- Then clone the repo

  ```bash
  mkdir ~/PiDash
  cd ~/PiDash
  git clone https://github.com/babanomania/PiDash.git .
  ```

- Run the nodejs server and test

  ```bash
  make install port=8080
  ```

  Then, Open [http://192.168.0.109:8080](http://192.168.0.109:8080) with your browser where 192.168.0.109 is your PI's ip.

- For updating the code use the below command

  ```bash
  make update port=8080
  ```

That's it! Your PiDash service is currently up and running and in case of a restart it will start automatically when the system boots.
