document.addEventListener('DOMContentLoaded', () => {
  let editor
  const $switch = document.getElementById('key-wrap')
  const $reset = document.getElementById('reset')
  const initMarkdown = () => {
    editor = new Cherry({
      id: 'markdown-container',
      value: '',
      editor: { defaultModel: 'editOnly', showSuggestList: false },
      toolbars: {
        toolbar: [
          'switchModel',
          '|',
          { bold: ['bold', 'italic', 'underline', 'strikethrough'] },
          'quote',
          'header',
          'size',
          'color',
          '|',
          { insert: ['ul', 'ol', 'image', 'link', 'hr', 'code', 'table'] },
        ],
        toc: false,
        bubble: false,
        float: false,
      },
    })
  }

  const initLayUI = () => {
    layui.use('laydate', function () {
      var laydate = layui.laydate
      laydate.render({ elem: '#date' })
    })

    layui.use('form', function () {
      var form = layui.form

      form.on('submit(markdown)', function (data) {
        layer.msg(JSON.stringify(data.field))
        console.log(editor.getMarkdown())
        return false
      })

      form.on('submit(html)', function (data) {
        layer.msg(JSON.stringify(data.field))
        console.log(editor.getHtml())
        return false
      })

      form.on('switch(html)', function (data) {
        $switch.classList.toggle('hide')
      })
    })
    $reset.click()
  }

  initMarkdown()
  initLayUI()
})
