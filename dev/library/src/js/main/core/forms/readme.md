# ST Core Forms Modules

## MediaUploader
This class is used for custom image/video upload inputs

### Example Usage
```html
<div class="image-upload-container">
      <label>Image 1:</label>
      <div class="file-input">
        <input type="file" id="image-1-upload"/>
      </div>
      <button class="upload-file">Upload File</button>
      <button class="remove-file">Remove File</button>
      <span class="media-label"></span>
      <div class="img-preview-box">
        <img class="image-preview" src=""/>
      </div>
</div>
```

```javascript
    import { Media Uploader } from './codepath-to-st-core-library/forms/MediaUploader';

    const uploader = new MediaUploader({
        input: $(this).find('input[type="file"]'),
        type: 'image', // or image
        sizeLimit: 10240
    });
    uploader.main();
```