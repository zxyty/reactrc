### 准备
```bash
# 安装依赖
yarn # 或者 npm i
```

### Mock开发
```bash
# 启动mock服务 默认访问地址为:localhost:3001
yarn start # 或者 npm run start
```

### dev开发
```bash
# 启动开发
yarn dev # 或者 npm run dev

# 浏览器访问 默认端口为8080
curl localhost:8080
```

### 打包发布
```bash
yarn build # 或者 npm run build

# 生成的release文件存放在`static`中
# 拷贝在nginx等服务器就行
```

### 单元测试
```bash
yarn test # 或者 npm run test

# 生成的代码测试覆盖率文件存放在`coverage`中
```