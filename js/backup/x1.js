// let delFile = async (incl) => {
//   let fileList = await easyfs(fs.readdir,'.')  //读取文件夹
//   for (let file of fileList) {
//     let f = await easyfs(fs.stat,file)
//     let a = f.isFile() == true
//     let t = file.includes(incl)
//     t ? await easyfs(fs.unlink,file) : 1
//   }
// }

let rename = async (incl,str,u) => {
    let fileList = await easyfs(fs.readdir,'.')  //读取文件夹
    for (let file of fileList) {
      let swi = async () => await easyfs(fs.rename,file,file.replace(incl,str))
      if (u == 'both'){swi();continue}
      let f = await easyfs(fs.stat,file)
      let a = f.isFile() == true
      let t = file.includes(incl)
      u == 'dir' ? (t = !a && t) : (t = a && t)
      t ? swi() : 1
    }
  }