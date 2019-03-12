import loadJsonFile from 'load-json-file'
import { AWS } from './aws'
import { Expected } from './expected'
import { Domain } from './domain'
import { Records } from './records'

export class Config {

  public static async load(fileName: string = './dnslint.json'): Promise<Config> {
    return new Promise((resolve, reject) => {
      try {
        loadJsonFile(fileName).then((json: any) => {
          const config = new Config()
          resolve({ ...config, ...(json) })
        })
      } catch (ex) {
        reject(ex)
      }
    })
  }
  public verbose = true
  public aws?: AWS = undefined
  public expected?: Expected = undefined
  public timeout = 1000
  public domains?: Domain[] = undefined
  public records?: Records = undefined
}
