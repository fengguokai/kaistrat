$(document).ready(function() {
    $('#defaultForm').bootstrapValidator({
//        live: 'disabled',
        message: 'This value is not valid',
        // feedbackIcons: {
        //     valid: 'glyphicon glyphicon-ok',
        //     invalid: 'glyphicon glyphicon-remove',
        //     validating: 'glyphicon glyphicon-refresh'
        // },
        fields: {
            title: {
                required:true,
                validators: {
                    notEmpty: {
                        message: '* 请输入项目标题，最多30个字'
                    }
                }
            },
            intorduce: {
                validators: {
                    notEmpty: {
                        message: '* 请输入内容，最多100个字'
                    }
                }
            },
            money: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '* 请输入众筹金额，金额范围为100-99999999元'
                    },
                    different: {
                        field: 'password',
                        message: 'The username and password cannot be the same as each other'
                    }
                }
            },
            days: {
                validators: {
                    notEmpty: {
                        message: '* 请输入众筹天数，范围为1-120天'
                    }
                }
            },

            // initiate-step3
            returnTitle:{
                validators:{
                    notEmpty:{
                        message:'* 请输入回报标题,字数范围为1-10字'
                    }
                }
            },
            returnDescribe:{
                validators:{
                    notEmpty:{
                        message:'* 请输入内容，最多1000个字'
                    }
                }
            },
            // findpwd.html
            verificationCode:{
                validators:{
                    notEmpty:{
                        message:'请输入6位数字验证码'
                    }
                }
            },
            newPassword:{
                validators:{
                    notEmpty:{
                        message:'密码为字母和数字的组合, 8-16 个字符'
                    }
                }
            },
            // register.html
            nickname:{
                validators:{
                    notEmpty:{
                        message:'昵称不能为空'
                    }
                }
            },
            regiphone:{
                validators:{
                    notEmpty:{
                        message:'手机格式异常'
                    }
                }
            },
            reqCode:{
                validators:{
                    notEmpty:{
                        message:'请输入6位数字验证码'
                    }
                }
            },
            reqPassword:{
                validators:{
                    notEmpty:{
                        message:'密码为字母和数字的组合, 8-16 个字符'
                    }
                }
            },
            userServer:{
                validators:{
                    notEmpty:{
                        message:'*请仔细阅读并同意《服务协议》、《法律声明及隐私权政策》。'
                    }
                }
            },
            modelname:{
                validators:{
                    notEmpty:{
                        message:'内容不能为空'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required and cannot be empty'
                    },
                    identical: {
                        field: 'password',
                        message: 'The password and its confirm are not the same'
                    },
                    different: {
                        field: 'username',
                        message: 'The password cannot be the same as username'
                    }
                }
            },
            birthday: {
                validators: {
                    date: {
                        format: 'YYYY/MM/DD',
                        message: 'The birthday is not valid'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'The gender is required'
                    }
                }
            },
            'languages[]': {
                validators: {
                    notEmpty: {
                        message: 'Please specify at least one language you can speak'
                    }
                }
            },
            'programs[]': {
                validators: {
                    choice: {
                        min: 2,
                        max: 4,
                        message: 'Please choose 2 - 4 programming languages you are good at'
                    }
                }
            },
            captcha: {
                validators: {
                    callback: {
                        message: 'Wrong answer',
                        callback: function(value, validator) {
                            var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                            return value == sum;
                        }
                    }
                }
            }
        }
    });
});