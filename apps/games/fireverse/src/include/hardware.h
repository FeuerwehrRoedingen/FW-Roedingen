#ifndef __SYSTEM_H__
#define __SYSTEM_H__

#include <vulkan/vulkan.hpp>
#include <GLFW/glfw3.h>

#include <optional>
#include <iostream>

namespace Hardware
{
  /**
   * @brief Vulkan instance
   * 
   */
  extern vk::Instance instance;
  extern VkDebugUtilsMessengerEXT debugMessenger;
  const std::vector<const char*> validationLayers = {
      "VK_LAYER_KHRONOS_validation"
  };

  #ifdef NDEBUG
      const bool enableValidationLayers = false;
  #else
      const bool enableValidationLayers = true;
  #endif

  struct QueueFamilyIndices {
    std::optional<uint32_t> graphicsFamily;
    inline bool isComplete() {
        return graphicsFamily.has_value();
    }
  };
  
  static inline VKAPI_ATTR VkBool32 VKAPI_CALL debugCallback(
    VkDebugUtilsMessageSeverityFlagBitsEXT messageSeverity,
    VkDebugUtilsMessageTypeFlagsEXT messageType,
    const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData,
    void* pUserData
  ) {

    std::cerr << "validation layer: " << pCallbackData->pMessage << std::endl;

    return VK_FALSE;
  }

  void createInstance();
  void initVulkan();
  void cleanup();
  void setupDebugMessenger();
  void populateDebugMessengerCreateInfo(VkDebugUtilsMessengerCreateInfoEXT& createInfo);
  bool isDeviceSuitable(VkPhysicalDevice device);
  bool checkValidationLayerSupport();
  QueueFamilyIndices findQueueFamilies(VkPhysicalDevice device);
  std::vector<const char*> getRequiredExtensions();
  VkResult CreateDebugUtilsMessengerEXT(
    VkInstance instance, 
    const VkDebugUtilsMessengerCreateInfoEXT* pCreateInfo, 
    const VkAllocationCallbacks* pAllocator, 
    VkDebugUtilsMessengerEXT* pDebugMessenger
  );
  void DestroyDebugUtilsMessengerEXT(
    VkInstance instance, 
    VkDebugUtilsMessengerEXT debugMessenger, 
    const VkAllocationCallbacks* pAllocator
  );

  /**
   * @brief Wrapper for all the GPU related functions
   * 
   */
  class GPU
  {
  private:
    VkPhysicalDevice physicalDevice;
    VkPhysicalDeviceFeatures deviceFeatures;

    VkDevice logicalDevice;
    VkQueue graphicsQueue;

  protected:
    void pickPhysicalDevice();
    void createLogicalDevice();
    
  public:
    GPU();
    ~GPU();
  
  };
}

#endif
