/**
 * @param {object} options
 * @param {string} options.path
 * @constructor
 */
Uploader = function(options){
    this._path = options.path;
    this._uploader = {};
};

Uploader.prototype = {

    /**
     * 업로드할 파일 목록에 추가한다.
     * @param {string} name
     * @param {File} file
     * @returns {boolean}
     */
    register : function(name, file){
        if(this._uploader.hasOwnProperty(name)){
            return false
        }

        this._uploader[name] = file;
        return true;
    },

    /**
     * 업로드할 파일 목록에서 제외한다.
     * @param {string} name
     * @returns {boolean}
     */
    except : function(name){
        this._uploader[name]= null;
        delete this._uploader[name];

        return true;
    },

    /**
     * images를 초기화 한다.
     */
    clear : function(){
        this._uploader = {};
    },

    /**
     * 파일 객체를 읽어 DataUrl을 반환한다.
     * @param {File} file
     * @returns {jQuery.Deferred}
     */
    read : function(file) {
        var reader = new FileReader(),
            deferred = $.Deferred();

        reader.onload = function(event) {
            deferred.resolve(file, event.target.result);
        };

        reader.onerror = function() {
            deferred.reject(this);
        };

        reader.readAsDataURL(file);

        return deferred.promise();
    },

    /**
     * 이미지를 서버에 업로드한다.
     * @returns {jQuery.Deferred}
     */
    execute : function(){
        var formData = new FormData(),
            name = '';

        for(name in this._uploader){
            formData.append('images[]', this._uploader[name]);
        }

        return $.ajax({
            type : 'post',
            url  : '/api/file?path=' + this._path,
            contentType: false,
            data : formData,
            processData : false
        }).then(function(uploaded){
            return uploaded.path;
        });
    }
};
