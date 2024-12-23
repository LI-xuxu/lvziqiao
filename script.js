// 等待DOM完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
  // 获取所需的DOM元素
  const messageForm = document.getElementById('message-form'); // 留言表单
  const nameInput = document.getElementById('name'); // 姓名输入框
  const emailInput = document.getElementById('email'); // 邮箱输入框
  const messageTextarea = document.getElementById('message'); // 留言文本框

  // 表单验证函数
  function validateForm() {
    let isValid = true; // 验证标志
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 邮箱验证正则表达式

    // 验证名字（至少2个字符）
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, '名字至少需要2个字符哦~');
      isValid = false;
    } else {
      removeError(nameInput);
    }

    // 验证邮箱格式
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, '请输入有效的邮箱地址~');
      isValid = false;
    } else {
      removeError(emailInput);
    }

    // 验证留言内容（至少5个字符）
    if (messageTextarea.value.trim().length < 5) {
      showError(messageTextarea, '留言内容至少需要5个字符呢~');
      isValid = false;
    } else {
      removeError(messageTextarea);
    }

    return isValid;
  }

  // 显示错误信息的函数
  function showError(element, message) {
    // 获取或创建错误信息元素
    const errorDiv = element.parentElement.querySelector('.error-message') || 
                    createErrorElement(message);
    
    // 如果错误信息不存在则添加
    if (!element.parentElement.querySelector('.error-message')) {
      element.parentElement.appendChild(errorDiv);
    }
    element.classList.add('error'); // 添加错误样式
  }

  // 创建错误信息元素的函数
  function createErrorElement(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff4444'; // 错误信息颜色
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    return errorDiv;
  }

  // 移除错误信息的函数
  function removeError(element) {
    const errorDiv = element.parentElement.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove(); // 移除错误信息
    }
    element.classList.remove('error'); // 移除错误样式
  }

  // 处理表单提交事件
  messageForm.addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交行为

    // 如果表单验证通过
    if (validateForm()) {
      // 收集表单数据
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageTextarea.value
      };

      // 输出表单数据到控制台（实际项目中这里应该是发送到服务器）
      console.log('提交的数据：', formData);

      // 显示成功消息
      alert('留言发送成功啦！我会尽快回复你的~');

      // 重置表单
      messageForm.reset();
    }
  });

  // 添加平滑滚动效果
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // 阻止默认跳转行为
      const targetId = this.getAttribute('href'); // 获取目标元素ID
      const targetElement = document.querySelector(targetId); // 获取目标元素
      
      // 如果目标元素存在，则平滑滚动到该位置
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // 平滑滚动
          block: 'start' // 滚动到顶部对齐
        });
      }
    });
  });
});