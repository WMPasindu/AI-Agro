// src/components/Home/Home.js
import React, { useState } from 'react';
import styles from './Home.module.css';
import { validateImage } from '../../helpers/imageValidation';
import { fetchVisualizationImages, getDiseaseInfo, processImage } from '../../helpers/apiHealpers';

const Home = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loadingDeseaseInfo, setLoadingDeseaseInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visualizationImages, setVisualizationImages] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (validateImage(file)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setLoadingDeseaseInfo(true);
      const response = await processImage(file);
      if (response) {
        const { 'predicted-class': diseaseCode } = response;
        const info = getDiseaseInfo(diseaseCode);
        setDiseaseInfo(info);
      }
      setLoadingDeseaseInfo(false);
    } else {
      alert('Invalid image file. Please upload a JPEG or PNG file.');
    }
  };

  const handleVisualizationClick = async () => {
    setLoading(true);
    const images = await fetchVisualizationImages();
    setVisualizationImages(images);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h1>AI Agro</h1>
      <div className={styles.visualizationText}>
        Helps you to detect diseases in your rice plants.
      </div>
      <div className={styles.uploadSection}>
        <input type='file' onChange={handleImageUpload} />
      </div>
      <div className={styles.resultSection}>
        <div className={styles.squareContainer}>
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt='Uploaded preview' />
            </div>
          )}
        </div>
        <div className={styles.squareContainer}>
          <div className={styles.outputSection}>
            {!loadingDeseaseInfo && <h2>{diseaseInfo ? 'Output' : ' No Results Found'}</h2>}
            <div className={styles.outputContent}>
              {loadingDeseaseInfo ? (
                <div>Loading...</div>
              ) : (
                diseaseInfo && (
                  <>
                    <div>
                      <strong>Disease Name:</strong> {diseaseInfo.name}
                    </div>
                    <div>
                      <strong>Sinhala Name:</strong> {diseaseInfo.sinhalaName}
                    </div>
                    <div>
                      <strong>Solution:</strong> {diseaseInfo.solution}
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.visualization}>
        <button onClick={handleVisualizationClick} disabled={loading}>
          {loading ? 'Loading...' : 'See How Detected'}
        </button>
        <div className={styles.visualizationText}>
          The AI focuses on this section of the image to detect the disease.
        </div>
        <div className={styles.visualizationImages}>
          {loading && <div className={styles.spinner}>Loading...</div>}
          {!loading &&
            visualizationImages.length > 0 &&
            visualizationImages.map((image, index) => (
              <div key={index} className={styles.visualizationImageContainer}>
                <img src={image} alt={`Visualization ${index + 1}`} />
                <div className={styles.visualizationLabel}>
                  {index === 0 ? 'Attention Map' : 'Grad-CAM Visualize'}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
