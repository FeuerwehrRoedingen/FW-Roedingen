cmake_policy(SET CMP0048 NEW)

project(Fireverse VERSION 0.0.1)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin)
cmake_minimum_required(VERSION 3.20)

#
# Vulkan
#
include_directories("C:/VulkanSDK/1.3.239.0/Include")
link_directories("C:/VulkanSDK/1.3.239.0/lib")

#
# GLFW
#
add_subdirectory(${CMAKE_SOURCE_DIR}/lib/glfw)

#
# MAIN
#
add_executable(main Main.cpp src/window.cpp src/system.cpp)
target_link_libraries(main PRIVATE glfw "C:/VulkanSDK/1.3.239.0/lib/vulkan-1.lib")
