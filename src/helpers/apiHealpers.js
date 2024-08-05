/**
 * Simulates a call to an external API to get visualization images.
 * @returns {Promise<string[]>} - An array of image URLs.
 */
export const fetchVisualizationImages = async () => {
  try {
    const imageUrls = [
      'https://picsum.photos/300?random&t=' + Math.random(),
      'https://picsum.photos/300?random&t=' + Math.random()
    ];
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

export const processImage = async (file) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      // Example API for Deseases
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Simulated Image Upload',
        body: 'Simulating image upload and processing.',
        userId: 1
      })
    });

    if (response.ok) {
      // Generate a random number from 0 to 3 to simulate the disease code
      const diseaseCode = Math.floor(Math.random() * 4);
      return { message: 'Image Uploaded and processed', 'predicted-class': diseaseCode };
    } else {
      console.error('Error uploading image:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

/**
 * Retrieves disease information based on a disease code.
 * @param {number} diseaseCode - The code representing the detected disease.
 * @returns {{name: string, sinhalaName: string, solution: string}} - Disease information.
 */
export const getDiseaseInfo = (diseaseCode) => {
  const diseaseData = [
    {
      code: 0,
      name: 'Bacterial Blight',
      sinhalaName: 'කොල අංගමාරය',
      solution: 'Use resistant varieties, proper spacing, and balanced fertilization.'
    },
    {
      code: 1,
      name: 'Rice Blast',
      sinhalaName: 'කොල පාලුව',
      solution: 'Use resistant varieties, proper fertilization, and water management.'
    },
    {
      code: 2,
      name: 'Brown Spot',
      sinhalaName: 'දුඹුරු පුල්ලි රෝගය',
      solution: 'Use disease-free seeds, proper water management, and balanced fertilization.'
    },
    {
      code: 3,
      name: 'Tungro',
      sinhalaName: 'ටන්ග්‍රෝ වෛරස් රෝගය',
      solution: 'Use resistant varieties and manage insect vectors.'
    }
  ];

  return diseaseData.find((disease) => disease.code === diseaseCode);
};
