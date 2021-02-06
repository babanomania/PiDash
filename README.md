## How to Deploy and Run on your Rasberry PI

- Then clone the repo

  ```bash
  mkdir ~/PiDash
  cd ~/PiDash
  git clone https://github.com/babanomania/PiDash.git
  ```

- Run the nodejs server and test

  ```bash
  npx next build
  npx next start -p 8080
  ```

  Then, Open [http://192.168.0.104:3000](http://192.168.0.104:3000) with your browser where 192.168.0.104 is your PI's ip.

- To Start the server on a different path say 8181 use the below commands

  ```bash
  npx next build
  npx next start -p 8181
  ```

  Then, Open [http://192.168.0.104:8181](http://192.168.0.104:8181) with your browser where 192.168.0.104 is your PI's ip.

- Install PM2 globally

  ```bash
  sudo npm install -g pm2
  ```

- Install PiDash as a service using PM2

  ```bash
  pm2 start yarn --name "PiDash" --interpreter bash -- start -p 8181
  ```

- Now just add PM2 on startup using the below command

  ```bash
  pm2 startup systemd
  ```

  It will generate the below command

  ```bash
  [PM2] Init System found: systemd
  [PM2] To setup the Startup Script, copy/paste the following command:
  sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
  ```

  Copy the generated command and run it.

  ```bash
  sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/p
  ```

  This created a system unit that will start PM2 on boot. When the system will boot PM2 will resurrect from a dump file that is not created yet. To create it run

  ```bash
  pm2 save
  ```

  This will save the current state of PM2 (with app.js running) in a dump file that will be used when resurrecting PM2.

  That's it! Your PiDash is currently running and in case of a restart, it will start when the system boots.
