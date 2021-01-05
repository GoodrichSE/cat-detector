CMAKE_MINIMUM_REQUIRED(VERSION 3.10)

project(cat_detector VERSION 1.0)

include_directories(/usr/local/include/jetson-utils /usr/local/include/jetson-inference /usr/local/cuda-10.0/targets/aarch64-linux/include/)

configure_file(cd-config.h.in cd-config.h)

add_executable(Main main.cpp)
 
target_include_directories(Main PUBLIC "${PROJECT_BINARY_DIR}" "${PROJECT_BINARY_DIR}/cpp")
