# toutiao-pc

### 1.预览地址

- http://www.lideminrecall.com/（暂未优化）



### 2.项目介绍

#### 2.1技术选型(前端)

- vue
- vue-router
- axios
- element-ui
- 组件化、模块化


#### 2.2功能模块

- 首页/登录
  - 要点：自定义校验登录表单/渲染首页展示数据
- 内容管理
  - 发布文章
    - 要点：
      - 在发布模式下：对待提交表单数据对象的处理
      - 在编辑模式下：根据路由传参，判断是否存在id，如果存在，获取id根据id取回对应文章渲染到列表，保存修改发布与正式发布共用一个请求，请求中利用三元判断id是否存在，然后决定使用发布接口(post)或修改接口(put)
      - 编辑思路整理：点击编辑，将对应点击文章的id通过路由传参传到发布(修改)页面，然后通过 `$route.params` 获取参数id，id存在，调用根据文章id获取文章接口去渲染数据到页面，修改后，调用put修改；id不存在，新增内容后，调用post新发布。post与put共用一个请axios请求，只需`id ? put : post` 即可
    - **难点(封面的上传，此处是整个项目的难点)**：
      - 组件的封装，父子组件之间的传值，曾：发表组件；父：封面组件；子：选择上传方式组件
      - 父传子，发布组件===多图模式===>封面组件数量===点击封面组件===>选择上传组件
      - 上传组件===(图片url)===>封面组件(为回传数据添加当前封面组件索引)====(url,index)===>发表组件(根据url和索引，更新对应的封面)
      - 三图模式要格外注意回传封面组件的索引，确定为哪个封面组件更新展示封面
  - 内容列表
    - 要/难点：检索发起请求前对数据的处理，根据接口要求对检索条件表单数据对象的拼接和处理，主要是对日期范围的处理
    - 检索逻辑的梳理：在没有选择筛选条件的前提下，展示出所有数据，监听所有的检索条件，当任一条件改变时，数据立即做出响应，同时对多条件的叠加检索也要做出正确响应，对不同类型检索数据的分页，要考虑到分页的重置，不同类型数据展示都要重置从第一页开始展示
  - 评论列表
    - 要点：评论列表的数据渲染，slot-scope作用域插槽
  - 素材管理
    - 要点：素材的上传(el-upload)与预览,通过对接口中素材收藏标识(is_collect)的判断实现收藏与取消收藏，通过判断不同的tab页签，进而请求不同的数据展示
- 粉丝管理
  - 图文数据
  - 粉丝概况
  - 粉丝画像
  - 粉丝列表
- 账户信息
  - 个人信息
    - 修改信息后，使用eventBus同步组件间的数据状态



### 3.项目启动

#### 3.1.安装依赖

```
yarn install
```

#### 3.2.运行启动

```
yarn serve
```

#### 3.3.访问

```
http://localhost:8080/
```

