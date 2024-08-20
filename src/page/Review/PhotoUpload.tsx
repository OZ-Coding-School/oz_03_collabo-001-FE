import React, { useState } from 'react';
import axios from 'axios';

const MAX_IMAGES = 5; //최대 이미지 개수

const PhotoUpload: React.FC = () => {
  const [images, setImages] = useState<(File | null)[]>(
    Array(MAX_IMAGES).fill(null)
  );
  const [previews, setPreviews] = useState<string[]>(
    Array(MAX_IMAGES).fill('')
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIndex === null) {
      alert('업로드할 위치를 선택하세요.');
      return;
    }

    const files = Array.from(event.target.files || []);
    const newImages = [...images];
    const newPreviews = [...previews];

    files.forEach((file, index) => {
      if (selectedIndex + index < MAX_IMAGES) {
        newImages[selectedIndex + index] = file;
        newPreviews[selectedIndex + index] = URL.createObjectURL(file);
      }
    });

    setImages(newImages);
    setPreviews(newPreviews);
    setSelectedIndex(null);
  };

  const handleUpload = () => {
    const filesToUpload = images.filter((file): file is File => file !== null);

    if (filesToUpload.length === 0) {
      alert('최소 1개의 이미지를 업로드해야 합니다.');
      return;
    }

    const formData = new FormData();
    filesToUpload.forEach((file) => formData.append('images', file));

    axios
      .post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => console.log('Upload success:', response.data))
      .catch((error) => console.error('Upload error:', error));
  };

  const handleDelete = (index: number) => {
    const newImages = images.map((image, i) => (i === index ? null : image));
    const newPreviews = previews.map((preview, i) =>
      i === index ? '' : preview
    );
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const renderPreview = (index: number) => (
    <div
      key={index}
      className='relative flex h-[113px] w-[113px] items-center justify-center rounded-[6px] border border-[#e1e1e1] bg-[#fafafa]'
    >
      {previews[index] ? (
        <>
          <img
            src={previews[index]}
            alt={`preview-${index}`}
            className='h-full w-full rounded-[6px] object-cover'
          />
          <button
            onClick={() => handleDelete(index)}
            className='absolute right-2 top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#e0e0e0] bg-opacity-50 text-xs font-semibold text-[#333]'
            title='삭제'
          >
            &times;
          </button>
        </>
      ) : (
        <button
          className='flex h-[113px] w-[113px] cursor-pointer items-center justify-center text-[20px] text-[#afafaf]'
          onClick={() => setSelectedIndex(index)}
        >
          +
        </button>
      )}
    </div>
  );

  return (
    <div className='h-[416px] bg-white'>
      <div className='h-[334px] space-y-[8px] px-[12px] py-[15px]'>
        <div className='h-[40px] content-end text-[14px] font-semibold'>
          사진을 등록해주세요.
        </div>
        <div className='flex h-[14px] items-center text-[12px] text-[#808080]'>
          최대 5장까지 등록가능합니다.(*최소 1장 필수등록)
        </div>

        <input
          id='file-input'
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* 사진 미리보기 */}
        <div className='flex space-x-[19px]'>
          {[0, 1, 2].map(renderPreview)}
        </div>
        <div className='flex space-x-[19px]'>{[3, 4].map(renderPreview)}</div>
      </div>

      <div className='mb-[10px] h-[72px] px-[12px] pb-[10px] pt-[20px]'>
        <button
          onClick={handleUpload}
          className='h-[42px] w-[376px] rounded-[4px] bg-primary text-sm font-medium text-white'
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default PhotoUpload;
