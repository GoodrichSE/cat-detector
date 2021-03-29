// cmake config file
#include "cd-config.h"

// C++ libraries
#include <stdio.h>
#include <iostream>
#include <cstring>
#include <signal.h>
#include <fmt/format.h>

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
std::string ret_str(int argc, char** argv)
{
	std::string retStr = fmt::format(s"");		
	printf("Hello World\n");

	printf(DUMMY);
	if (argc <2) {
		//report version
		retStr += fmt::format("{} Version {}.{} \n", argv[0], cat_detector_VERSION_MAJOR, cat_detector_VERSION_MINOR);
		retStr += fmt::format("Usage: {} number\n", argv[0]);
		return retStr;
	}

	if(signal(SIGINT, signal_handler) == (SIG_ERR))
			printf("Signal handler error.\n");

	if (argc =2) {
		// Check filetype and continue if movie
		if(strstr(argv[1], ".mp4\0") || strstr(argv[1], ".mov\0"))
			retStr += fmt::format("Filename: {}\n", argv[1]);
		else
		{
			retStr += fmt::format("Acceptable formats: .mp4, .mov\n");
		}
		return retStr;
	}
}
