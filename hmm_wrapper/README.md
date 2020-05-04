# Testing The Model
We have prepared an easy to setup NodeJS web application which is intuitive and could be used to generate audio from the trained models.

## Setting up
To setup `flite`, 
```sh
cd hmm_wrapper
git clone https://github.com/festvox/flite.git
cd flite
./configure
make
```
Once, `flite` is configured, add the trained .flitevox files in the `voices` directory and change the names of the emotions in the index.html accordingly.
> **Caution**
> The emotion and the name of the .flitevox file must be the same. For example, for the emotion happy, happy.flitevox will be used.

## Running the Wrapper
The server can be run using
```sh
node server.js
```
The above command will run the server on localhost at port 5050.

## Setup for Windows

You can install supported versions of Linux alongside Windows without setting up a virtual machine by installing Windows Subsystem for Linux on your computer.
Follow the below mentioned steps or https://www.windowscentral.com/install-windows-subsystem-linux-windows-10 for installation. 
```
Open Settings and click on Apps.
Click Program and Features option under related settings.
Click on 'Turn Windows features on or off' option.
Click on 'Windows Subsystem for Linux' and press restart after clicking ok.
Open Microsoft Store and launch Ubuntu.
Create your username and password.
```

After completing the above steps type bash in your command prompt and install Node.js and GCC, a standard compilor for Linux. 
```sh
sudo apt-get update
sudo apt install gcc
Install node js
```
To setup runtime tts engine `flite` and running the wrapper , type the following commands 

```sh
cd hmm_wrapper
git clone https://github.com/festvox/flite.git
cd flite
./configure
make
node server.js
```
Open index.html to add emotion and message. If the output file is not generated in hmm_wrapper directory, type the following command on your command prompt.
```sh
./flite/bin/flite -voice voices/amused.flitevox --setf duration_stretch=1.00 -t  "Ah, I had forgotten, he exclaimed." amused_7.wav
```
Type the emotion of your interest at the place of amused in the above command. Those emotions whose .flitevox files are present in the
voices directory can only be used. Write your message in place of the sentence present in double quotes. Replace `amused7.wav` with `your_file_name.wav`

## Some examples

- We tried out a few sentences that we felt were giving a really good result. To start out you can try those too! There are available here: [\[doc\]](https://docs.google.com/document/d/1TEUK0rZovpz9TAgXgwlqSc8VskVsGPafBC-DbSrBxyg/edit?usp=sharing)
- The emotions in the brackets after the utterance indicate the emotions where the maximum contrast in the generated speech samples can be perceived.


