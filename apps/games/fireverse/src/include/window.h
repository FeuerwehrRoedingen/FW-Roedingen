#ifndef __WINDOW_H__
#define __WINDOW_H__

#include <iostream>

#include <vulkan/vulkan_core.h>
#include <vulkan/vulkan.h>
#include <vulkan/vulkan.hpp>

#include <GLFW/glfw3.h>

class Window
{
private:
  GLFWwindow* glfwWindow;
  const uint32_t WIDTH = 800;
  const uint32_t HEIGHT = 600;

public:
  void createWindow();
  void cleanup();
  bool shouldClose();
};

#endif
