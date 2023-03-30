#ifndef __GPU_H__
#define __GPU_H__

#include <vulkan/vulkan.hpp>
#include <GLFW/glfw3.h>

namespace System
{
  /**
   * @brief Vulkan instance
   * 
   */
  vk::Instance instance;
  void createInstance();


  bool isDeviceSuitable(VkPhysicalDevice device);

  /**
   * @brief Wrapper for all the Hardware related functions
   * 
   */
  class GPU
  {
  private:
    VkPhysicalDevice physicalDevice;

  protected:
    void pickPhysicalDevice();

  public:
    
  };
}

#endif
