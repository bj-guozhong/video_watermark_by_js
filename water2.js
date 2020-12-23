function watermark(settings) {
            //默认设置
            var defaultSettings={
                watermarl_element:"layui-body",
                watermark_txt:"",
                watermark_x:10,//水印起始位置x轴坐标
                watermark_y:10,//水印起始位置Y轴坐标
                watermark_rows:2000,//水印行数
                watermark_cols:2000,//水印列数
                watermark_x_space:30,//水印x轴间隔
                watermark_y_space:30,//水印y轴间隔
                watermark_color:'#d7d7d7',//水印字体颜色
                watermark_alpha:0.4,//水印透明度
                watermark_fontsize:'15px',//水印字体大小
                watermark_font:'微软雅黑',//水印字体
                watermark_width:200,//水印宽度
                watermark_height:50,//水印长度
                watermark_angle:15//水印倾斜度数
            };
            //采用配置项替换默认值，作用类似jquery.extend
            if(arguments.length===1&&typeof arguments[0] ==="object" ) {
                var src=arguments[0]||{};
                for(key in src) {
                    if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key]){
                        continue;
                    } else if(src[key]){
                        defaultSettings[key]=src[key];
                    }
                }
            }

            var oTemp = document.createDocumentFragment();

            var maskElement=document.getElementById(defaultSettings.watermarl_element) || document.body;
            //获取页面最大宽度
            var page_width = Math.max(maskElement.scrollWidth,maskElement.clientWidth);
            //获取页面最大高度
            var page_height = Math.max(maskElement.scrollHeight,maskElement.clientHeight,maskElement.scrollTop);
            //水印数量自适应元素区域尺寸
            defaultSettings.watermark_cols=Math.ceil(page_width/(defaultSettings.watermark_x_space+defaultSettings.watermark_width));
            defaultSettings.watermark_rows=Math.ceil(page_height/(defaultSettings.watermark_y_space+defaultSettings.watermark_height));
            var x;
            var y;
            for (var i = 0; i < defaultSettings.watermark_rows; i++) {
                y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
                for (var j = 0; j < defaultSettings.watermark_cols; j++) {
                    x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
                    var mask_div = document.createElement('div');
                    mask_div.id = 'mask_div' + i + j;
                    mask_div.className = 'mask_div';
                    //mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
                    mask_div.innerHTML=(defaultSettings.watermark_txt);
                    //设置水印div倾斜显示
                    mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.visibility = "";
                    mask_div.style.position = "absolute";
                    mask_div.style.left = x + 'px';
                    mask_div.style.top = y + 'px';
                    mask_div.style.overflow = "hidden";
                    mask_div.style.zIndex = "1000"; // 9999
                    // pointer-events:none  让水印不遮挡页面的点击事件
                    mask_div.style.pointerEvents='none';
                    // 设置边框
                    // mask_div.style.border="solid #eee 1px";
                    // 兼容IE9以下的透明度设置
                    mask_div.style.filter="alpha(opacity=50)";
                    mask_div.style.opacity = defaultSettings.watermark_alpha;
                    mask_div.style.fontSize = defaultSettings.watermark_fontsize;
                    mask_div.style.fontFamily = defaultSettings.watermark_font;
                    mask_div.style.color = defaultSettings.watermark_color;
                    mask_div.style.textAlign = "center";
                    mask_div.style.width = defaultSettings.watermark_width-80 + 'px';
                    mask_div.style.height = defaultSettings.watermark_height + 'px';
                    mask_div.style.display = "block";
                    oTemp.appendChild(mask_div);
                }
            }
            maskElement.appendChild(oTemp);
}
//格式化时间
function dateFormat(fmt, date) {
            var ret;
            var opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (var k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                }
            }
            return fmt;
        }
