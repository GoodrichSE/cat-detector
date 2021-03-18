// cmake config file
#include "cd-config.h"

// C++ libraries
#include <stdio.h>
#include <iostream>
#include <cstring>
#include <signal.h>

// nVidia shared libraries
#include<glDisplay.h>
#include<imageNet.h>

// Libraries built by this package


bool kill_command = false; // User control flag

// Handles kill command from user for graphics window
void signal_handler(int signo)
{
	if( signo == SIGINT) //interrupt
	{
		printf("Received SIGINT\n");
		kill_command = true;
	}	
}
int main(int argc, char** argv)
{
	printf("Hello World\n");

	printf(DUMMY);
	if (argc <2) {
		//report version
		std::cout << argv[0] << " Version " << cat_detector_VERSION_MAJOR << "." << cat_detector_VERSION_MINOR << std::endl;
		std::cout << "Usage: " << argv[0] << " number" << std::endl;
		return 1;
	}

	if(signal(SIGINT, signal_handler) == (SIG_ERR))
			printf("Signal handler error.\n");

	if (argc =2) {
		// Check filetype and continue if movie
		if(strstr(argv[1], ".mp4\0") || strstr(argv[1], ".mov\0"))
			std::cout << "Filename: " << argv[1] << std::endl;
		else
		{
			printf("Acceptable formats: .mp4, .mov\n");
			return -1;
		}
	}
}
