
export class MediaUploader {

    constructor (options) {
        this.input = options.input;
        this.type = options.type || 'image';
        this.sizeLimit = options.sizeLimit || false;
        this.field = this.input.parent().parent();
        this.upload = this.field.find('.upload-file');
        this.remove = this.field.find('.remove-file');
        this.value = null;
        this.files = null;
        this.filename = null;
        this.validity = {
            ext: true,
            filesize: true
        };
    }


    main() {
        this.upload.on('click', (e) => {
            e.preventDefault();
            this.input.click();
        });

        this.remove.on('click', (e) => {
            e.preventDefault();
            this.removeFile();
        });

        this.input.on('change', (e) => {
            this.value = e.target.value;
            this.files = e.target.files[0];
            this.filename = this.value.substring(this.value.lastIndexOf("\\") + 1);
            this.validity.ext = MediaUploader.validateFileExtension(this.value, this.type);

            if (this.validity.ext && this.validity.filesize) {
                this.writePreviewToDocument();
            } else {
                MediaUploader.errorHandling(this.validity, this.type);
            }
        });
    }


    writePreviewToDocument() {
        const label = this.field.find('.media-label');
        label.text(this.filename);
        label.fadeIn(350);

        if (this.type == 'image') {
            const reader = new FileReader();
            const img = this.field.find('.img-preview-box');

            reader.onload = () => {
                img.find('img').attr('src', reader.result);
            };

            reader.readAsDataURL(this.files);
            img.fadeIn(350);
        }
    }


    removeFile() {
        const label = this.field.find('.media-label');
        label.text('').slideUp(350);

        if (this.type == 'image') {
            const img = this.field.find('.img-preview-box');
            img.slideUp(350);
            img.find('img').attr('src', '');
        }

        this.files = null;
        this.filename = null;
        this.value = null;
        this.input.val(null);
    }

    /*
        Helper Methods
    */
    static validateFileExtension(filename, type) {
        let validExtensions;

        switch (type) {
            case 'image':
                validExtensions = ["jpg", "png", "gif", "jpeg"];
                break;
            case 'video':
                validExtensions = ["mp4", "avi", "wmv", "flv", "mov"];
                break;
            default:
                // Somethings gone wrong. Let it pass so the 
                // server side validation can do it's thing.
                return true;
        }

        const extension = filename.substring(filename.lastIndexOf('.') + 1)
                            .toLowerCase();
        
        if (new RegExp(validExtensions.join("|")).test(extension)) {
            return true;
        } else {
            return false;
        }
    }


    static validateFileSize(file, limit) {
        if (limit) {
            if (file.size > limit) {
                return false;
            } 
        }

        return true;
    }


    static errorHandling(validity, type) {
        let message = '';

        if (!validity.ext) {
            message += `Please upload a valid ${type}.`;
        }

        if (!validity.filesize) {
            message += 'Uploaded file is is too large.';
        }

        alert(message);
    }

}
