# HMM-based Emotional Text-to-speech

A repository with comprehensive instructions for using the Festvox toolkit for generating emotional speech from text


# Training Hidden Markov Model
Festvox project is part of the work at [Carnegie Mellon University's speech group](http://www.speech.cs.cmu.edu) aimed at advancing the state of Speech Synthesis.

We will be using Festvox to train our HMM models and build voices.

## Requirements
- Docker
- Audio Files: The audio files to be used for training.
- File with utterances: A file which contains the path to the audio file and their transcripts. Schema is described below.

## Setup

### Docker Image
An already configured Docker Image is created by [mjansche](https://hub.docker.com/u/mjansche) for the Text-to-Speech tutorial at SLTU 2016. We will be training our HMM models using this Docker Image.

The Docker Image can be pulled by
```
docker pull mjansche/tts-tutorial-sltu2016
```
After pulling the docker image, we need to setup **flite** which is an open source small fast run-time text to speech engine.
To setup `flite`, run the docker image and once in the directory `/usr/local/src` run the following commands

```sh
git clone https://github.com/festvox/flite.git
cd flite
./configure
make
```

### Audio Files
The training requires PCM encoded 16bit mono wav audio files with a sampling rate of 16kHz. Please use `ffmpeg` to convert the recorded audio files to the correct format by running the following
```sh
ffmpeg -i input.mp3 -acodec pcm_s16le -ac 1 -ar 16000 output.wav
```

### File with Utterances
For training you need to make a file named **txt.done.data** with the base filenames of all the utterances and the text of each utterance. e.g.
```
( audio_0001 "a whole joy was reaping." )
( audio_0002 "but they've gone south." )
( audio_0003 "you should fetch azure mike." )
```
> **Caution**
> There is a space after/before the round braces and between the file name and the utterance. 
> The utterance must be in double quotes.

## Train HMM
### Preparing the Directory
The first step to train HMM is to prepare the directory.
After running the docker image,

```sh
cd /usr/local/src/festvox/src/clustergen
mkdir cmu_us_ss
cd cmu_us_ss
$FESTVOXDIR/src/clustergen/setup_cg cmu us ss
```
> Instead of "cmu" and "ss" you can pick any names you want, but please keep "us" so that Festival knows to use the US English pronunciation dictionary. For indic voices, use "indic" instead of "us".

### Synthesis of Audio Files
Assuming that you have already prepared the audio files and the list of utterances,
```sh
cp -p WHATEVER/txt.done.data etc/
cp -p WHATEVER/wav/*.wav recording/
```

Assuming the recordings might not be as good as the could be you can power normalize them.
```sh
./bin/get_wavs recording/*.wav
```

Also synthesis builds (especially labeling) work best if there is only a limited amount of leading and trailing silence. We can do this by
```sh
./bin/prune_silence wav/*.wav
```
> **Note:** If you do not require these three stages, you can put your wavefiles directly into wav/

### Building Voices
For building voices, you can use an automated script that will do the feature extraction, build the models and generate some text examples.
```sh
./bin/build_cg_rfs_voice
```

#### For manual build
Firsty build the prompts and label the data.
```sh
./bin/do_build build_prompts etc/txt.done.data
./bin/do_build label etc/txt.done.data
./bin/do_clustergen parallel build_utts etc/txt.done.data
./bin/do_clustergen generate_statename
./bin/do_clustergen generate_filters
```

Then do feature extraction
```sh
./bin/do_clustergen parallel f0_v_sptk
./bin/do_clustergen parallel mcep_sptk
./bin/do_clustergen parallel combine_coeffs_v
```

Build the models
```sh
./bin/traintest etc/txt.done.data
./bin/do_clustergen parallel cluster etc/txt.done.data.train
./bin/do_clustergen dur etc/txt.done.data.train
```

### Generating Voices
We will use **flite** to generate audio from the trained model.
```sh
rm -rf flite
$FLITEDIR/tools/setup_flite
./bin/build_flite cg
cd flite
make
```
**flite** requires .flitevox object to build the voices. Create the .flitevox object by 
```sh
./flite_cmu_us_${NAME} -voicedump output.flitevox
```
Then audio can be easily generated for any utterance by
```sh
./flite_cmu_us_${NAME} "<sentence to utter>" output.wav
```

# References
[Festvox](http://festvox.org) : Festvox project developed by Carnegie Mellon University.\
[Docker](https://hub.docker.com/r/mjansche/tts-tutorial-sltu2016/) : Festvox configured docker image.\
[Building Data](http://www.cs.columbia.edu/~ecooper/tts/utt_eng.html) : The format for utterance file.\
[Training](http://festvox.org/bsv/x3528.html) : Steps to train the HMM Model.\
[Automated Script](http://festvox.org/cmu_indic/unpacked_all/cmu_indic_slp_mr/bin/build_cg_voice) : Description of the automated script.