import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import SparkMD5 from 'spark-md5'

/**
 * 计算文件的抽样 hash（与浏览器版本一致）
 * @param {string} filePath 文件路径
 * @returns {Promise<string>} 返回计算出的 hash
 */
export function calculateFileHashSample (
  filePath: string,
): Promise<string> {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    const size = fs.statSync(filePath).size
    const offset = 0.5 * 1024 * 1024 // 步长
    const chunks: Uint8Array[] = []
    const fd = fs.openSync(filePath, 'r') // 打开文件

    function readChunk (position, length) {
      const buffer = new Uint8Array(length)
      fs.readSync(fd, buffer, 0, length, position)
      chunks.push(buffer)
    }

    // 读取前 offset 个字节
    readChunk(0, Math.min(offset, size))

    let cur = offset
    while (cur < size) {
      if (cur + offset >= size) {
        readChunk(cur, size - cur)
      }
      else {
        const mid = cur + offset / 2
        const end = cur + offset
        readChunk(cur, 2)
        readChunk(mid, 2)
        readChunk(end - 2, 2)
      }
      cur += offset
    }

    // 计算 hash
    const combinedBuffer = Buffer.concat(chunks)
    spark.append(combinedBuffer)
    resolve(spark.end())
  })
}
