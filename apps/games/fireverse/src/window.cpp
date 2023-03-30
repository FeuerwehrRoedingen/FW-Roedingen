#include "include/window.h"

void Window::createWindow()
{
  glfwInit();
  glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
  glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

  glfwWindow = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);
}

void Window::cleanup()
{
  glfwDestroyWindow(glfwWindow);

  glfwTerminate();
}

bool Window::shouldClose()
{
  return glfwWindowShouldClose(glfwWindow);
}