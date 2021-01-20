import React, { Component } from "react";

function FormCreate(Comp) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.options = {}
            this.state = {

            }
        }
        handleChange(e) {
            const { name, value } = e.target
            this.setState({
                [name]: value
            }, () => {
                this.validateFields(name)
            })

        }
        validateFields(name) {
        //校验规则
            const rule = this.options[name].rules

        }

        getFieldDecorator(field, option) {
            this.options[field] = option
            return InputComp => (
                React.cloneElement(InputComp, {
                    name: field,
                    value: this.state[field] || "",
                    onChange: (e) => { this.handleChange(e) }

                })
            )
        }
        render() {
            return (
                <Comp
                    {...this.props}
                    getFieldDecorator={(field,option)=>this.getFieldDecorator(field, option)}
                />
            )
        }

    }
}


class FormTest extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { getFieldDecorator } = this.props
        return (
            <div>
                {
                    getFieldDecorator("username", {
                        rules: [{ required: true, message: "请输⼊入⽤用户名" }]
                    })(<input type="text" />)
                }
                {
                    getFieldDecorator("password", {
                        rules: [{ required: true, message: "请输⼊入密码" }]
                    })(<input type="password" />)}
                <button>登录</button>
            </div>
        )
    }
}
const WithForm = FormCreate(FormTest)
export default WithForm
