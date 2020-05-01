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