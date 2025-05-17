export class Product {
  id?: number =0;
  name?: string="";
  description?: string="";
  price?: number=0;
  mainPhoto?: Photo | null= null;
  photos?: Photo[] = [];
}

export class Photo{
  id?:string='';
  photoName?:string='';
  extension?:string='';
  content?: string='';
  isMainPhoto?:boolean=false;

}
