CMAKE_MINIMUM_REQUIRED(VERSION 3.10)

project(cat_detector VERSION 1.0)

configure_file(cd-config.h.in cd-config.h)

add_executable(Main main.cpp)
 
target_include_directories(Main PUBLIC "${PROJECT_BINARY_DIR}" "${PROJECT_BINARY_DIR}/cpp")
