import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactCountUpWrapper from '@/components/ReactCountUpWrapper';
import { LucideIcon } from 'lucide-react';
export default function InsightsCards({ title, value, Icon }: { title: string; value: number; Icon: LucideIcon }) {
  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader className="flex pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon
          size={120}
          className="text-muted-foreground absolute -bottom-4 -right-8 opacity-10"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountUpWrapper value={value} />
        </div>
      </CardContent>
    </Card>
  );
}
