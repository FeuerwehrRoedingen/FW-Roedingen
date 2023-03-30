#include <iostream>
#include <vulkan/vulkan.hpp>

#include "src/include/window.h"
#include "src/include/hardware.h"

int main(int argc, char** argv)
{
  Window window{};
  window.createWindow();

  Hardware::initVulkan();

  while(!window.shouldClose())
  {
    glfwPollEvents();
  }

  window.cleanup();
  Hardware::cleanup();
}
