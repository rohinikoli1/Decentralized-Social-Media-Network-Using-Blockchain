import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
import IpfsHttpClient from 'ipfs-http-client';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})

//    implementation
//    constructor(@Inject(ipfsToken) private ipfs)

export class IpfsService {

  public ipfs;
  public hash: string;
  public content: Buffer;
  
  constructor() {
    this.ipfs = new InjectionToken('The IPFS Token', {
      providedIn: 'root',
      factory: () => {
        try {
          return new IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        } catch (err) {
          console.log('Error', err);
          throw new Error('Unable to access IPFS node daemon on Infura network');
        }
      }
    });
  }

  public async setText(value: string){
    for await (const result of this.ipfs.add(value)) {
      console.log('Output of set',result);
      this.hash = result.path;
    }
    return this.hash;
  }

  public async getText(hash: string){
    for await (const file of this.ipfs.get(hash)) {
      console.log('Uotput of get', file);
      for await (const chunk of file.content) {
        this.content = chunk;
      }
    }
    return this.content.toString();
  }

  public async setImg(files: File[]){
    for await (const result of this.ipfs.files.add(files, { recursive: true })) {
      console.log('Output of set',result)
      console.log('Image Uploaded',result.path)
      this.hash = result.path
    }
    return this.hash;
  }

  public async getImg(hash: String){
    return 'https://gateway.ipfs.io/ipfs/'+hash;
  }

}
