#include <iostream>
#include <vulkan/vulkan.hpp>

#include "src/include/window.h"
#include "src/include/system.h"

int main(int argc, char** argv)
{
  Window window{};
  System::GPU gpu{};

  window.createWindow();

  while(!window.shouldClose())
  {
    glfwPollEvents();
  }

  window.cleanup();
}
