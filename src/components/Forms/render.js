export default {
    name: 'formExpand',
    functional: true,
    render: (h, ctx) => {
        var {formData, formModel, formItem, index} = ctx.props
        return ctx.props.render(h, formData, formModel, formItem, index)
    }
}
