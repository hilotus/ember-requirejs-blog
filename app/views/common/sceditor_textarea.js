define(["ember", "sceditor"], function(Ember){
    var SCEditorTextAreaView = Ember.TextArea.extend({
        tagName: 'textarea',
        classNames: ['pure-input-1'],
        value: "",

        didInsertElement: function() {
            var textarea = this.$(), self = this;

            Ember.run.schedule('afterRender', function() {
                // 将textarea对象保存在parentView的controller中
                self.get('relativeController').set('textarea', textarea);
                self.initSCEditor(textarea);
            })
        },

        // 初始化 SCEditor 控件
        initSCEditor: function(textarea) {
            // 初始化 SCEditor 控件
            textarea.sceditor({
                locale: "cn",
                emoticonsRoot: "js/lib/sceditor/",
                style: "js/lib/sceditor/minified/jquery.sceditor.default.min.css",
                width: textarea[0].offsetWidth,
                height: 400,
                resizeEnabled: false,

                // TODO: 因为剪切粘贴功能有问题，暂时不使用
                toolbar:"bold,italic,underline,strike,subscript,superscript|left,center,right,justify|font,size,color,removeformat|pastetext|bulletlist,orderedlist|table|code,quote|horizontalrule,image,email,link,unlink|emoticon,youtube,date,time|ltr,rtl|print,maximize,source",
            });
        }
    })

    Ember.Handlebars.helper('sceditor-textarea', SCEditorTextAreaView)
})

