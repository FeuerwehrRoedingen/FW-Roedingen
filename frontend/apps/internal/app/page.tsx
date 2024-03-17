
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Navbar isBlurred maxWidth='2xl' className='bg-gray-900'>
        <NavbarBrand>
          <h1 className="text-2xl font-semibold">FWR Internal</h1>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem>
            <Link color='danger' href='/api/auth/login'>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href='/signup' color='danger' variant='ghost'>
              Signup
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </main>
  )
}
