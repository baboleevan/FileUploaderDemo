/**
 * @param {Uploader} uploader
 * @constructor
 */
var Logs = function(uploader){
    this._uploader = uploader;

    this._assignElements();
    this._bindEvents();
};

Logs.prototype = {

    /**
     * 엘리먼트를 캐쉬한다.
     * @private
     */
    _assignElements : function(){
        this.welBtnUpload = $('#btn-upload');
        this.welConsole = $('.console');
    },

    /**
     * 이벤트를 바인딩한다.
     * @private
     */
    _bindEvents : function(){
        this.welBtnUpload.on('click', $.proxy(this._onClickButtonUpload, this));
    },

    /**
     * 업로드 버튼 클릭 이벤트 리스너
     * @private
     */
    _onClickButtonUpload : function(){
        var html = this.welConsole.html().replace(/\s+<p>(.+)<\/p>/g, '$1\n'),
            blob = new Blob([html], {type: 'text/plain'}),
            file = new File([blob], ['2014-07-18_log.txt']),
            self = this;

        uploader.register('', file);

        uploader.execute().done(function(){
            self.welConsole.html('<p>업로드 완료</p>');
        });
    }
};