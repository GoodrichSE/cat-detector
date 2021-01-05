#!/usr/bin/env python3
import subprocess


def main():
    """ Main entry point of the app """
    print("hello world")
    run_inference_command = "./../cpp/build/Main gettyimages-480868504-640_adpp.mp4"
    process = subprocess.run(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()


if __name__ == "__main__":
    """ This is executed when run from the command line """
    main()

