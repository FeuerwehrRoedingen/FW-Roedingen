import { redirect } from "next/navigation"

export default function(error: Error): never {

  const name = encodeURIComponent(error.name);
  const message = encodeURIComponent(error.message);

  const cause = error.cause ? encodeURIComponent(JSON.stringify(error.cause)) : '';
  const stack = error.stack ? encodeURIComponent(error.stack) : '';

  const url = `/error?name=${name}&message=${message}&cause=${cause}&stack=${stack}`;

  redirect(url);
}
