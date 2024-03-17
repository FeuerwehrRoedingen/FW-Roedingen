import { redirect } from "next/navigation"

export default function(error: Error) {

  const name = encodeURIComponent(error.name);
  const message = encodeURIComponent(error.message);

  const stack = error.stack ? encodeURIComponent(error.stack): "";
  const cause = error.cause ? encodeURIComponent(JSON.stringify(error.cause)): "";

  const url = `/error?name=${name}&message=${message}&stack=${stack}&cause=${cause}`;

  redirect(url);
}