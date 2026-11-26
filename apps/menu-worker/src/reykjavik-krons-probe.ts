import {readFileSync} from "node:fs";
import {HttpMenuClient} from "./http-client.js";
import {extractHtmlVisibleText} from "./html-extractor.js";
import {verifyKronsMenu} from "./reykjavik-krons-preview.js";
async function main(){
 const review=JSON.parse(readFileSync(new URL("../../../docs/reykjavik-krons-review.json",import.meta.url),"utf8"));
 if(review.status!=="manual-source-review-only-not-production"||review.restaurant.currency!=="ISK"||review.source!=="https://krons.is/"||review.items.length!==23)throw new Error("Invalid review");
 const response=await new HttpMenuClient().fetchSource({url:review.source,userAgent:"FysenMenuBot/0.1",etag:null,lastModified:null});
 if(response.kind!=="content")throw new Error("Expected complete source");
 const items=verifyKronsMenu(extractHtmlVisibleText(response.body),review.items);
 console.log(JSON.stringify({status:"reviewed-ordinary-menu-not-published",publication:"none",restaurant:review.restaurant,sourceUrl:review.source,observedAt:response.fetchedAt,rawSha256:response.rawSha256,items},null,2));
}
void main().catch((e:unknown)=>{console.error(e instanceof Error?e.message:String(e));process.exitCode=1;});
