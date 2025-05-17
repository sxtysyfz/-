import React, { useState } from 'react';
import axios from 'axios';
import './BridgeCrackDetection.css';

function BridgeCrackDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setPredictionResult(null);
        setError(null);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('请先选择一张图片');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 这里应该是实际的API调用，此处为模拟
      // 实际应用中，你需要替换为真实的API端点
      const response = await axios.post(
        'https://api.example.com/detect-cracks',
        { image: selectedImage },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // 模拟API返回的结果
      // 实际返回可能包含裂缝位置、严重程度等信息
      setPredictionResult({
        hasCrack: Math.random() > 0.5, // 模拟50%的概率有裂缝
        severity: Math.random() > 0.5 ? '轻度' : '中度', // 随机严重程度
        // 在实际应用中，这里可能会有裂缝位置坐标等信息
      });
    } catch (err) {
      console.error('Error during prediction:', err);
      setError('检测过程中出错，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="crack-detection-container">
      <h2 className="title">桥梁裂缝检测系统</h2>

      <div className="image-upload-section">
        <div className="image-container">
          {selectedImage ? (
            <img src={selectedImage} alt="上传的桥梁" className="preview-image" />
          ) : (
            <div className="empty-image-placeholder">
              <i className="fa fa-image fa-4x" aria-hidden="true"></i>
              <p>上传桥梁图片</p>
            </div>
          )}
        </div>

        <div className="upload-controls">
          <label htmlFor="image-upload" className="upload-button">
            <i className="fa fa-upload" aria-hidden="true"></i> 选择图片
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <button
            className="detect-button"
            onClick={handleSubmit}
            disabled={!selectedImage || isLoading}
          >
            {isLoading ? (
              <span>
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> 检测中...
              </span>
            ) : (
              <span>
                <i className="fa fa-search" aria-hidden="true"></i> 开始检测
              </span>
            )}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {predictionResult && (
        <div className="result-section">
          <h3 className="result-title">检测结果</h3>
          <div className="result-details">
            {predictionResult.hasCrack ? (
              <div className="crack-detected">
                <i className="fa fa-exclamation-triangle warning-icon" aria-hidden="true"></i>
                <p>检测到裂缝，严重程度: <span className="severity">{predictionResult.severity}</span></p>
              </div>
            ) : (
              <div className="no-crack">
                <i className="fa fa-check-circle success-icon" aria-hidden="true"></i>
                <p>未检测到裂缝</p>
              </div>
            )}

            {/* 这里可以添加可视化结果的展示，例如在原图上标记裂缝位置 */}
            {predictionResult.hasCrack && (
              <div className="crack-visualization">
                {/* 这部分内容会根据实际API返回的裂缝位置信息进行渲染 */}
                <p>裂缝位置已标记在图像上</p>
                {/* 实际应用中，这里可能会有一个Canvas来绘制检测结果 */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BridgeCrackDetection;