cmake_policy(SET CMP0048 NEW)

project(Fireverse VERSION 0.0.1)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin)
cmake_minimum_required(VERSION 3.20)

#
# Vulkan
#
if(UNIX AND APPLE)
  set(VULKAN_DIR "/Users/thomas/VulkanSDK/1.3.243.0/macOS/")
  set(VULKAN_LIB ${VULKAN_DIR}/lib/libvulkan.1.dylib)
elseif()
  set(VULKAN_DIR "C:/VulkanSDK/1.3.239.0")
  set(VULKAN_LIB ${VULKAN_DIR}/lib/vulkan-1.lib)
  endif()
include_directories(${VULKAN_DIR}/Include)
link_directories(${VULKAN_DIR}/lib)

#
# GLFW
#
add_subdirectory(${CMAKE_SOURCE_DIR}/lib/glfw)

#
# MAIN
#
add_executable(main Main.cpp src/window.cpp src/hardware.cpp)
target_link_libraries(main PRIVATE glfw ${VULKAN_LIB})
