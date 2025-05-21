import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import type {AnyFieldApi} from '@tanstack/react-form'
import {useForm} from '@tanstack/react-form'
import {useAuth} from "@/context/auth-context.tsx"
import * as React from "react";
import {useNavigate} from "@tanstack/react-router";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
      <>
        {field.state.meta.isTouched && !field.state.meta.isValid ? (
            <em>{field.state.meta.errors.join(', ')}</em>
        ) : null}
        {field.state.meta.isValidating ? 'Validating...' : null}
      </>
  )
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const { setAuthenticated, refreshUser } = useAuth()
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            cid: '',
            password: '',
        },
        onSubmit: async ({value}) => {
            const res = await fetch('/api/authentication/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    characterId: parseInt(value.cid),
                    password: value.password,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                alert(data.error ?? 'Login failed')
            } else {
                setAuthenticated(true)
                await refreshUser()
                navigate({ to: '/dashboard', replace: true })
            }
        },
    })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  To The Los Santos Mobile Data Terminal.
                </p>
              </div>
              <div className="grid gap-3">
                <form.Field
                    name="cid"
                    validators={{
                      onChange: ({ value }) =>
                          !value || !/^\d+$/.test(value)
                              ? 'A Valid Citizen ID is required'
                              : undefined,
                    }}
                    children={(field) => {
                      return (
                          <>
                            <Label htmlFor={field.name}>Citizen ID <span className="text-red-500"><FieldInfo field={field} /></span></Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                type="text"
                                pattern="[0-9]*"
                                placeholder="12345"
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                          </>
                      )
                    }}
                />

              </div>
              <div className="grid gap-3">
                  <form.Field
                      name="password"
                      validators={{
                          onChange: ({ value }) =>
                              !value ? 'Password is required' : undefined,
                      }}
                      children={(field) => {
                        return (
                            <>
                              <Label htmlFor={field.name}>Password <span className="text-red-500"><FieldInfo field={field} /></span></Label>
                              <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  type="password"
                                  placeholder="password"
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                              />
                            </>
                        )
                      }}
                  />
                        <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                          Forgot your password?
                        </a>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/assets/mdt_sasp-DN1PRTWX.png"
              alt="Image"
              className="absolute inset-0 h-full object-cover dark:brightness-[0.5]"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        This website has no affiliation with any real organisation or entity. This website is purely fictional and for entertainment purposes.
      </div>
    </div>
  )
}
