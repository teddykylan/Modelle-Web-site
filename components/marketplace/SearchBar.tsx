"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
    placeholder?: string;
    initialValue?: string;
}

export function SearchBar({ placeholder = "Rechercher un template...", initialValue = "" }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(initialValue || searchParams.get("q") || "");

    useEffect(() => {
        setValue(initialValue || searchParams.get("q") || "");
    }, [initialValue, searchParams]);

    const updateQuery = (nextValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (nextValue.trim()) {
            params.set("q", nextValue.trim());
        } else {
            params.delete("q");
        }
        params.delete("page");
        const queryString = params.toString();
        startTransition(() => {
            router.replace(queryString ? `/templates?${queryString}` : "/templates");
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => updateQuery(value), 400);
        return () => clearTimeout(timer);
    }, [value, updateQuery]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateQuery(value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Label htmlFor="template-search" className="sr-only">
                Rechercher
            </Label>
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    id="template-search"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder={placeholder}
                    className="pl-11 h-12"
                />
            </div>
            <Button type="submit" disabled={isPending} className="h-12">
                Rechercher
            </Button>
        </form>
    );
}
