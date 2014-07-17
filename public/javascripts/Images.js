/**
 * @param {Uploader} uploader
 * @constructor
 */
var Images = function(uploader){
    this._uploader = uploader;

    this._assignElements();
    this._bindEvents();
};

Images.prototype = {

    /**
     * 엘리먼트를 캐쉬한다.
     * @private
     */
    _assignElements : function(){
        this.welBtnUpload = $('#btn-upload');
        this.welBtnSearch = $('#btn-search');
        this.welIptFile =  $('#ipt-file');
        this.welMediaList = $('#media-list');
        this.welConsole = $('.console');
        this._tmplMedia = Handlebars.compile($('#media').html());
    },

    /**
     * 이벤트를 바인딩한다.
     * @private
     */
    _bindEvents : function(){
        this.welBtnUpload.on('click', $.proxy(this._onClickButtonUpload, this));
        this.welBtnSearch.on('click', $.proxy(this._onClickButtonSearch, this));
        this.welIptFile.on('change', $.proxy(this._onChangeInputFile, this));
        this.welMediaList.on('click', 'a', $.proxy(this._onClickThumbnail, this));
    },

    /**
     * 이미지 선택 버튼 클릭 이벤트 리스너
     * @param {MouseEvent} event
     * @private
     */
    _onClickButtonSearch : function(event){
        this.welIptFile.trigger('click');
    },

    /**
     * 파일 타입 인풋 체인지 이벤트 리스너
     * @param {MouseEvent} event
     * @private
     */
    _onChangeInputFile : function(event){
        var images = event.currentTarget.files,
            item = null,
            self = this,
            i, n;

        for(i = 0, n = images.length; i < n; i++){
            item = images.item(i);

            if(this._uploader.register(item.name, item)){
                this._uploader.read(item).then(function(file, dataUrl){
                    self.welMediaList.append(self._tmplMedia({
                        name : file.name,
                        data_url: dataUrl
                    }));
                });
            }else{
                alert('동일한 이름의 파일은 추가할 수 없습니다. ['+ item.name +']');
            }
        }
    },

    /**
     * 업로드 버튼 클릭 이벤트 리스너
     * @param {MouseEvent} event
     * @private
     */
    _onClickButtonUpload : function(event){
        var self = this;

        this._uploader.execute().done(function(paths){
            paths.forEach(function(url){
                self.welMediaList.empty();
                self.welConsole.append($('<p>'+url+' 업로드 완료.</p>'));
                self._uploader.clear();
            });
        });
    },

    /**
     * 썸네일 클릭 이벤트 리스너
     * 섬네일을 클릭하면 업로드 목록에서 제외
     * @param {MouseEvent} event
     * @private
     */
    _onClickThumbnail : function(event){
        var welThumbnail = $(event.currentTarget),
            name = welThumbnail.data('name');

        this._uploader.except(name);
        welThumbnail.parents('li').remove();
    }
};